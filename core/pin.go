package core

import (
	"fmt"
	"slices"

	"github.com/google/uuid"
)

// Pin: component that can be connected to wires
// It does not define any channel but:
// - it listens to all connected wire channels
// - it sends its logic level to all connected wire channels but the one that sent it
// - it updates its logic level when receiving a signal from a connected wire
type Pin struct {
	id            string
	label         string
	logicLevel    LogicLevel        // the pin's logic level (last received value from connected wires)
	inputSignals  []*SignalListener // the input signals to which the pin is connected along with their done channels to stop listening (as opposed to components, pins do not instantiate channels, they only listen to & communicate on them, that's why they need a way to stop listening)
	outputSignals []*Signal         // pins only communicate on output channels as a side effect of listening to input channels, that's why they a done channel since no goroutine is launched to send signals on output channels
}

// Constructor: create and return a new pin with the given label and position
func NewPin(label string) *Pin {
	return &Pin{
		id:            string(uuid.New().String()),
		label:         label,
		logicLevel:    Undefined,
		inputSignals:  make([]*SignalListener, 0),
		outputSignals: make([]*Signal, 0),
	}
}

// Signals

// Connect an input to the pin and start listening to it
func (p *Pin) ConnectInput(signal *Signal) {
	doneChan := p.addInputListener(signal)
	inputListener := SignalListener{
		signal:   signal,
		doneChan: doneChan,
	}
	p.inputSignals = append(p.inputSignals, &inputListener)
}

// Disconnect an input from the pin
func (p *Pin) DisconnectInput(signal *Signal) {
	for i, s := range p.inputSignals {
		fmt.Println("Disconnecting input signal (len=", len(p.inputSignals), ")")
		if s.signal == signal {
			s.doneChan <- true
			p.inputSignals = slices.Delete(p.inputSignals, i, i+1)
			fmt.Println("Disconnected input signal (len=", len(p.inputSignals), ")")
		}
	}
}

// Connect an input to the pin & send the pin's logic level to the output signal
func (p *Pin) ConnectOutput(signal *Signal) {
	p.outputSignals = slices.Insert(p.outputSignals, len(p.outputSignals), signal)
	go func() {
		*signal <- p.logicLevel
	}()
}

// Disconnect an input from the pin
func (p *Pin) DisconnectOutput(signal *Signal) {
	for i, s := range p.outputSignals {
		if s == signal {
			p.outputSignals = slices.Delete(p.outputSignals, i, i+1)
		}
	}
}

// Listeners

// Launch a goroutine that listens to the input signal and updates the pin's logic level and notifies all output signals
func (p *Pin) addInputListener(signal *Signal) chan bool {
	doneChan := make(chan bool)
	go func() {
		for {
			select {
			case p.logicLevel = <-*signal:
				go p.notifyOutputs() // notify all output signals asynchronously to avoid blocking the input signal ... might use a buffered channel instead to preserve order
			case <-doneChan:
				return
			}
		}
	}()
	return doneChan
}

// Notify all output signals of the pin's logic level change
func (p *Pin) notifyOutputs() {
	for j := range p.outputSignals {
		*p.outputSignals[j] <- p.logicLevel
	}
}

// Getters & Setters

// Return the pin's logic level
func (p *Pin) GetLogicLevel() LogicLevel {
	return p.logicLevel
}

// Set the pin's logic level.
// Usefull to set the pin's logic level: during initialization & when connecting the pin to a wire
// Logic gates should only change the pin's logic level through signals (channels) after evaluating their transfer function on input pins level change or when triggered by a clock signal.
func (p *Pin) SetLogicLevel(level LogicLevel) {
	p.logicLevel = level
}
