package core

import (
	"testing"
	"time"
)

func andTransferFn(inputs []LogicLevel) []LogicLevel {
	outputs := make([]LogicLevel, 1)
	if inputs[0] == Undefined || inputs[1] == Undefined {
		outputs[0] = Undefined
	} else if inputs[0] == High && inputs[1] == High {
		outputs[0] = High
	} else {
		outputs[0] = Low
	}
	return outputs
}

func TestNewComponent(t *testing.T) {
	andGate := NewComponent([]string{"A", "B"}, []string{"Y"}, andTransferFn)

	// Check that the component has an id
	if andGate.id == "" {
		t.Errorf("Expected id to be non-empty, got %s", andGate.id)
	}

	// Check that the component has the correct name (transfer function name)
	if andGate.name != "andTransferFn" {
		t.Errorf("Expected name to be 'andTransferFn', got %s", andGate.name)
	}

	// Check that the component has the correct label
	if andGate.label != "Component" {
		t.Errorf("Expected label to be 'Component', got %s", andGate.label)
	}

	// Check that the component has the correct number of inputs and outputs
	if len(andGate.inputs) != 2 {
		t.Errorf("Expected 2 inputs, got %d", len(andGate.inputs))
	}
	if len(andGate.outputs) != 1 {
		t.Errorf("Expected 1 output, got %d", len(andGate.outputs))
	}

	// check that the input and output pins have the correct labels
	if andGate.inputPins[0].label != "A" {
		t.Errorf("Expected input 0 to have label 'A', got %s", andGate.inputPins[0].label)
	}
	if andGate.inputPins[1].label != "B" {
		t.Errorf("Expected input 1 to have label 'B', got %s", andGate.inputPins[1].label)
	}
	if andGate.outputPins[0].label != "Y" {
		t.Errorf("Expected output to have label 'Y', got %s", andGate.outputPins[0].label)
	}
}

func TestComponentListenToPin(t *testing.T) {

	andGate := NewComponent([]string{"A", "B"}, []string{"Y"}, andTransferFn)

	// Test listening to a pin (we insert sleep to make the output deterministic)
	go func() {
		andGate.inputChannels[0] <- High
		time.Sleep(100 * time.Millisecond)
		andGate.inputChannels[1] <- High
		time.Sleep(100 * time.Millisecond)
		andGate.inputChannels[0] <- Low
		time.Sleep(100 * time.Millisecond)
		andGate.inputChannels[0] <- High
		time.Sleep(100 * time.Millisecond)
	}()

	// Since both inputs are Undefined at launch, the first output should be Undefined
	output1 := <-andGate.outputChannels[0]
	// After sending High to both inputs A & B, the output should be High
	output2 := <-andGate.outputChannels[0]
	// Then, we send Low to input A, the output should be Low
	output3 := <-andGate.outputChannels[0]
	// Then we send High again on input A, the output should be High
	output4 := <-andGate.outputChannels[0]

	if output1 != Undefined {
		t.Errorf("Expected output to be Undefined, got %d", output1)
	}
	if output2 != High {
		t.Errorf("Expected output to be High, got %d", output2)
	}
	if output3 != Low {
		t.Errorf("Expected output to be Low, got %d", output3)
	}
	if output4 != High {
		t.Errorf("Expected output to be High, got %d", output4)
	}
}
