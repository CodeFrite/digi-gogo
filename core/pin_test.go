package core

import (
	"fmt"
	"testing"
	"time"
)

// TestNewPin:
// - create a new pin with label "A"
// - check that the pin has an id
// - check that the pin has the correct label
// - check that the pin has the correct logic level
// - check that the pin has no input signals
// - check that the pin has no output signals
func TestNewPin(t *testing.T) {
	pin := NewPin("A")

	// Check that the pin has an id
	if pin.id == "" {
		t.Errorf("Expected id to be non-empty, got %s", pin.id)
	}

	// Check that the pin has the correct label
	if pin.label != "A" {
		t.Errorf("Expected label to be 'A', got %s", pin.label)
	}

	// Check that the pin has the correct logic level
	if pin.logicLevel != Undefined {
		t.Errorf("Expected logic level to be Undefined, got %s", pin.logicLevel.String())
	}

	// Check that the pin has no input signals
	if len(pin.inputSignals) != 0 {
		t.Errorf("Expected 0 input signals, got %d", len(pin.inputSignals))
	}

	// Check that the pin has no output signals
	if len(pin.outputSignals) != 0 {
		t.Errorf("Expected 0 output signals, got %d", len(pin.outputSignals))
	}
}

// TestConnectInput:
// - create a new pin with label "A"
// - connect a new signal to the pin
// - check that the pin has the correct number of input signals
// - send a logic level to the input signal & check that the pin's logic level is updated
func TestConnectInput(t *testing.T) {
	pin := NewPin("A")
	signal := make(Signal)

	pin.ConnectInput(&signal)

	// Check that the pin has the correct number of input signals
	if len(pin.inputSignals) != 1 {
		t.Errorf("Expected 1 input signal, got %d", len(pin.inputSignals))
	}

	// Send a logic level to the input signal & check that the pin's logic level is updated
	signal <- High
	if pin.logicLevel != High {
		t.Errorf("Expected logic level to be High, got %s", pin.logicLevel.String())
	}
}

// TestDisconnectInput:
// - create a new pin with label "A"
// - connect a new signal to the pin
// - disconnect the signal from the pin
// - check that the pin has no input signals
// - send a logic level to the input signal & check that the pin's logic level is not updated
func TestDisconnectInput(t *testing.T) {
	pin := NewPin("A")
	signal := make(Signal)

	pin.ConnectInput(&signal)
	pin.DisconnectInput(&signal)

	// Check that the pin has no input signals
	if len(pin.inputSignals) != 0 {
		t.Errorf("Expected 0 input signals, got %d", len(pin.inputSignals))
	}

	// Send a logic level to the input signal & check that the pin's logic level is not updated
	go func() {
		signal <- High
	}()
	time.Sleep(100 * time.Millisecond)

	if pin.logicLevel != Undefined {
		t.Errorf("Expected logic level to be Undefined, got %s", pin.logicLevel.String())
	}
}

// TestConnectOutput:
// - create a new pin with label "A"
// - connect a new signal to the pin
// - connect an output signal to the pin
// - check that the pin has the correct number of output signals
// - check that the pin has the correct initial logic level (Undefined)
// - send a 'High' logic level to the input signal & check that the output signal receives the logic level
func TestConnectOutput(t *testing.T) {
	pin := NewPin("A")
	inputSignal := make(Signal)
	outputSignal := make(Signal)

	pin.ConnectInput(&inputSignal)
	pin.ConnectOutput(&outputSignal)

	// receive the initial logic level from the output signal
	fmt.Println("Initial logic level = ", <-outputSignal)

	// Check that the pin has the correct number of output signals
	if len(pin.outputSignals) != 1 {
		t.Errorf("Expected 1 output signal, got %d", len(pin.outputSignals))
	}

	// Check that the pin has the correct logic level
	if pin.logicLevel != Undefined {
		t.Errorf("Expected logic level to be Undefined, got %s", pin.logicLevel.String())
	}

	// Send an input signal to the pin & check that the output signal receives the logic level
	inputSignal <- High
	logicLevel := <-outputSignal
	if logicLevel != High {
		t.Errorf("Expected logic level to be High, got %s", logicLevel.String())
	}
}

// TestConnectMultipleOutputs: Given a pin is connected to multiple output signals (wires), And the pin receives a logic level from an input signal, Then the pin should notifies all output signals of the logic level change.
// - create a new pin with label "A"
// - connect a new signal to the pin
// - connect two output signals to the pin
// - check that the pin has the correct number of output signals
// - check that the pin has the correct initial logic level (Undefined)
// - send a 'High' logic level to the input signal & check that both output signals receive the logic level
func TestConnectMultipleOutputs(t *testing.T) {
	pin := NewPin("A")
	inputSignal := make(Signal)
	outputSignal1 := make(Signal, 1)
	outputSignal2 := make(Signal, 1)

	pin.ConnectInput(&inputSignal)
	pin.ConnectOutput(&outputSignal1)
	pin.ConnectOutput(&outputSignal2)

	// Check that the pin has the correct number of output signals
	if len(pin.outputSignals) != 2 {
		t.Errorf("Expected 2 output signals, got %d", len(pin.outputSignals))
	}

	// the initial logic level from the output signals should be undefined (received from ConnectOutput)
	logicLevel1 := <-outputSignal1
	logicLevel2 := <-outputSignal2

	if logicLevel1 != Undefined || logicLevel2 != Undefined {
		t.Errorf("Expected initial logic levels to be Undefined, got %s and %s", logicLevel1.String(), logicLevel2.String())
	}

	// Send an input signal to the pin & check that both output signals receive the logic level
	inputSignal <- High
	logicLevel1 = <-outputSignal1
	logicLevel2 = <-outputSignal2
	if logicLevel1 != High || logicLevel2 != High {
		t.Errorf("Expected logic levels to be High, got %s and %s", logicLevel1.String(), logicLevel2.String())
	}
}

func TestDisconnectOutput(t *testing.T) {
	pin := NewPin("A")
	inputSignal := make(Signal)
	outputSignal1 := make(Signal)
	outputSignal2 := make(Signal)
	outputSignal3 := make(Signal)

	pin.ConnectInput(&inputSignal)
	pin.ConnectOutput(&outputSignal1)
	pin.ConnectOutput(&outputSignal2)
	pin.ConnectOutput(&outputSignal3)

	// Check that the pin has 3 output signals
	if len(pin.outputSignals) != 3 {
		t.Errorf("Expected 3 output signals, got %d", len(pin.outputSignals))
	}

	// Send an input signal to the pin & check that the output signals do all 3 receive the logic level
	inputSignal <- High

	logicLevel1 := <-outputSignal1
	logicLevel2 := <-outputSignal2
	logicLevel3 := <-outputSignal3

	if logicLevel1 != High || logicLevel2 != High || logicLevel3 != High {
		t.Errorf("Expected logic levels to be High, got %s, %s and %s", logicLevel1.String(), logicLevel2.String(), logicLevel3.String())
	}

	// Disconnect the output signal 2
	pin.DisconnectOutput(&outputSignal2)

	// Check that the pin has 2 output signals
	if len(pin.outputSignals) != 2 {
		t.Errorf("Expected 2 output signals, got %d", len(pin.outputSignals))
	}
}
