package core

import (
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
		// define the default logic level for the input to be Undefined
		logicLevel := Undefined
		component.inputs = append(component.inputs, &logicLevel)
		// create a new signal for the input and attach it to the component
		signal := make(Signal)
		component.inputSignals = append(component.inputSignals, &signal)
		component.addInputListener(&signal, len(component.inputSignals)-1)
		// create a new pin for the input and connect it as the output of the pin: when the input pin receives a signal, it will forward it to the transfer function while notifying its outputs
		pin := NewPin(label)
		pin.ConnectOutput(&signal)
		component.inputPins = append(component.inputPins, pin)
	}

	// output state, pins & channels
	for _, label := range outputPinLabels {
		// define the default logic level for the output to be Undefined
		component.outputs = append(component.outputs, Undefined)
		// create a new signal for the output and attach it to the component
		signal := make(Signal)
		component.outputSignals = append(component.outputSignals, &signal)
		// create a new pin for the output and connect it as the input of the pin: when the transfer function updates the output, it will notify the output pin
		pin := NewPin(label)
		pin.ConnectInput(&signal)
		component.outputPins = append(component.outputPins, pin)
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
	c.addInputListener(&signal, len(c.inputSignals)-1)
}

// Connect an input to the transfer function and start listening to it. When a signal is received, the transfer function is called and the output signals are notified.
func (c *Component) addInputListener(signal *Signal, idx int) {
	go func() {
		for {
			// wait for a logic level to be received on the input signal
			logicLevel := <-*signal
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
