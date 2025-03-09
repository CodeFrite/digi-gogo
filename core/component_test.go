package core

import (
	"fmt"
	"testing"
	"time"
)

func andTransferFn(inputs []*LogicLevel) []LogicLevel {
	outputs := make([]LogicLevel, 1)
	if *inputs[0] == Undefined || *inputs[1] == Undefined {
		outputs[0] = Undefined
	} else if *inputs[0] == High && *inputs[1] == High {
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

	// Create a new AND gate
	andGate := NewComponent([]string{"A", "B"}, []string{"Y"}, andTransferFn)

	pinA := andGate.inputPins[0]
	pinB := andGate.inputPins[1]
	pinY := andGate.outputPins[0]

	// attach a listener to the output pin
	signalA := make(Signal)
	signalB := make(Signal)
	signalY := make(Signal)
	pinA.ConnectInput(&signalA)
	pinB.ConnectInput(&signalB)
	pinY.ConnectOutput(&signalY)

	// The first output should be Undefined
	output0 := <-signalY
	fmt.Println("output0:", output0)

	// Since both inputs are Undefined at launch, the first output should be Undefined
	signalA <- High
	time.Sleep(100 * time.Millisecond)
	output1 := <-signalY
	fmt.Println("output1:", output1)
	// After sending High to both inputs A & B, the output should be High
	signalB <- High
	time.Sleep(100 * time.Millisecond)
	output2 := <-signalY
	fmt.Println("output2:", output2)
	// Then, we send Low to input A, the output should be Low
	signalA <- Low
	time.Sleep(100 * time.Millisecond)
	output3 := <-signalY
	fmt.Println("output3:", output3)
	// Then we send High again on input A, the output should be High
	signalA <- High
	time.Sleep(100 * time.Millisecond)
	output4 := <-signalY
	fmt.Println("output4:", output4)

	if output1 != Undefined {
		t.Errorf("Expected output to be Undefined, got %v", output1.String())
	}
	if output2 != High {
		t.Errorf("Expected output to be High, got %v", output2.String())
	}
	if output3 != Low {
		t.Errorf("Expected output to be Low, got %v", output3.String())
	}
	if output4 != High {
		t.Errorf("Expected output to be High, got %v", output4.String())
	}
}
