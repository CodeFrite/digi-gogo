package core

import (
	"fmt"

	"github.com/google/uuid"
)

type Component struct {
	id            string
	name          string
	label         string
	transferFn    TransferFn
	inputs        []*LogicLevel
	inputPins     []*Pin
	inputSignals  []*Signal
	outputs       []LogicLevel
	outputPins    []*Pin
	outputSignals []*Signal
}

// constructor: create and return a new component with the given input and output names and transfer function
func NewComponent(inputPinLabels, outputPinLabels []string, transferFn TransferFn) *Component {
	component := Component{
		id:            uuid.New().String(),
		name:          getFuncName(transferFn),
		label:         "Component",
		transferFn:    transferFn,
		inputs:        make([]*LogicLevel, 0),
		inputPins:     make([]*Pin, 0),
		inputSignals:  make([]*Signal, 0),
		outputs:       make([]LogicLevel, 0),
		outputPins:    make([]*Pin, 0),
		outputSignals: make([]*Signal, 0),
	}

	// input state, pins & channels
	for _, label := range inputPinLabels {
		logicLevel := Undefined
		component.inputs = append(component.inputs, &logicLevel)
		component.inputPins = append(component.inputPins, NewPin(label))
		signal := make(Signal)
		component.inputSignals = append(component.inputSignals, &signal)
		component.inputSignalListener(&signal, len(component.inputSignals)-1)
	}

	// output state, pins & channels
	for _, label := range outputPinLabels {
		component.outputs = append(component.outputs, Undefined)
		component.outputPins = append(component.outputPins, NewPin(label))
		signal := make(Signal)
		component.outputSignals = append(component.outputSignals, &signal)
	}

	// save transfer function
	component.transferFn = transferFn

	return &component
}

// Useful for sources which might receive their input signal from a time.Ticker which we don't want to render. It will keep track of the input logic level and signal but will not add an associated pin to the component.
func (c *Component) AddHiddenInput(signal Signal) {
	logicLevel := Undefined
	c.inputs = append(c.inputs, &logicLevel)
	c.inputSignals = append(c.inputSignals, &signal)
	c.inputSignalListener(&signal, len(c.inputSignals)-1)
}

// Connect an input to the transfer function and start listening to it. When a signal is received, the transfer function is called and the output signals are notified.
func (c *Component) inputSignalListener(signal *Signal, idx int) {
	go func() {
		for {
			// wait for a logic level to be received on the input signal
			logicLevel := <-*signal
			fmt.Println("received ", logicLevel.String())
			// update the corresponding input signal logic level
			c.inputs[idx] = &logicLevel
			// call the transfer function and update the output logic levels
			c.outputs = c.transferFn(c.inputs)
			// notify the output pins of the change in output signals
			c.notifyOutputs()
		}
	}()
}

// Notify each respective output pin of the component of a change in the output signals. The way this function is currently coded implies that the component has a one-to-one mapping between transfer function outputs and output pins.
func (c *Component) notifyOutputs() {
	for j, output := range c.outputs {
		*c.outputSignals[j] <- output
	}
}
