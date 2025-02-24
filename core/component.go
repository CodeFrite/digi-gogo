package core

import "github.com/google/uuid"

type Component struct {
	id             string
	name           string
	label          string
	transferFn     TransferFn
	inputs         []LogicLevel
	inputPins      []Pin
	inputChannels  []Signal
	outputs        []LogicLevel
	outputPins     []Pin
	outputChannels []Signal
}

// constructor: create and return a new component with the given input and output names and transfer function
func NewComponent(inputPinLabels, outputPinLabels []string, transferFn TransferFn) Component {
	component := Component{
		id:             uuid.New().String(),
		name:           getFuncName(transferFn),
		label:          "Component",
		transferFn:     transferFn,
		inputs:         make([]LogicLevel, 0),
		inputPins:      make([]Pin, 0),
		inputChannels:  make([]Signal, 0),
		outputs:        make([]LogicLevel, 0),
		outputPins:     make([]Pin, 0),
		outputChannels: make([]Signal, 0),
	}

	// input state, pins & channels
	for _, label := range inputPinLabels {
		component.inputs = append(component.inputs, Undefined)
		component.inputPins = append(component.inputPins, NewPin(label))
		component.inputChannels = append(component.inputChannels, make(Signal))
	}

	// output state, pins & channels
	for _, label := range outputPinLabels {
		component.outputs = append(component.outputs, Undefined)
		component.outputPins = append(component.outputPins, NewPin(label))
		component.outputChannels = append(component.outputChannels, make(Signal))
	}

	// save transfer function
	component.transferFn = transferFn

	// Launch a goroutine that listens to the input signals and calls the transfer function
	component.run()

	return component
}

// run func:
// - acquire incoming logic level values from input channels
// - saves them to the inputs state
// - executes the transferFn on the new input state to produce the output state
// - send the output state to the output channels
func (c *Component) run() {
	go func() {
		for i, inputChannel := range c.inputChannels {
			go func(i int, inputChannel Signal) {
				for {
					select {
					// read input signals and update the input states (logic levels)
					case c.inputs[i] = <-inputChannel:
						// write output signals with the new output states (logic levels)
						// apply the transfer function to the input states
						// notify the output signals of the new output states
						outputs := c.transferFn(c.inputs)
						for j, output := range outputs {
							c.outputs[j] = output
							c.outputChannels[j] <- output
						}
					}
				}
			}(i, inputChannel)
		}
	}()
}

// Connect inpu
