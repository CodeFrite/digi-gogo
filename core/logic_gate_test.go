package core

import (
	"testing"
)

func TestNotGate(t *testing.T) {
	notGate := NewNotGate()
	// check base component attributes
	if notGate.name != "NewNotGate" {
		t.Errorf("Expected name to be 'NewNotGate', got %s", notGate.name)
	}
	if notGate.label != "Component" {
		t.Errorf("Expected label to be 'Component', got %s", notGate.label)
	}
	if len(notGate.inputs) != 1 {
		t.Errorf("Expected 1 input, got %d", len(notGate.inputs))
	}
	if len(notGate.inputPins) != 1 {
		t.Errorf("Expected 1 input pin, got %d", len(notGate.inputPins))
	}
	if len(notGate.inputSignals) != 1 {
		t.Errorf("Expected 1 input signal, got %d", len(notGate.inputSignals))
	}
	if len(notGate.outputs) != 1 {
		t.Errorf("Expected 1 output, got %d", len(notGate.outputs))
	}
	if len(notGate.outputPins) != 1 {
		t.Errorf("Expected 1 output pin, got %d", len(notGate.outputPins))
	}
	if len(notGate.outputSignals) != 1 {
		t.Errorf("Expected 1 output signal, got %d", len(notGate.outputSignals))
	}

	// check the transfer function

	// send Low, expect High
	*notGate.inputSignals[0] <- Low
	outputLogicLevel := <-*notGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}

	// send High, expect Low
	*notGate.inputSignals[0] <- High
	outputLogicLevel = <-*notGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}

	// send High again, expect Low
	*notGate.inputSignals[0] <- High
	outputLogicLevel = <-*notGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}

	// send Low again, expect High
	*notGate.inputSignals[0] <- Low
	outputLogicLevel = <-*notGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}

}

func TestAndGate(t *testing.T) {
	andGate := NewAndGate()
	// check base component attributes
	if andGate.name != "NewAndGate" {
		t.Errorf("Expected name to be 'NewAndGate', got %s", andGate.name)
	}
	if andGate.label != "Component" {
		t.Errorf("Expected label to be 'Component', got %s", andGate.label)
	}
	if len(andGate.inputs) != 2 {
		t.Errorf("Expected 2 inputs, got %d", len(andGate.inputs))
	}
	if len(andGate.inputPins) != 2 {
		t.Errorf("Expected 2 input pins, got %d", len(andGate.inputPins))
	}
	if len(andGate.inputSignals) != 2 {
		t.Errorf("Expected 2 input signals, got %d", len(andGate.inputSignals))
	}
	if len(andGate.outputs) != 1 {
		t.Errorf("Expected 1 output, got %d", len(andGate.outputs))
	}
	if len(andGate.outputPins) != 1 {
		t.Errorf("Expected 1 output pin, got %d", len(andGate.outputPins))
	}
	if len(andGate.outputSignals) != 1 {
		t.Errorf("Expected 1 output signal, got %d", len(andGate.outputSignals))
	}

	// check the transfer function

	// send Low, Low, expect Low
	*andGate.inputSignals[0] <- Low
	*andGate.inputSignals[1] <- Low
	<-*andGate.outputSignals[0]
	outputLogicLevel := <-*andGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}

	// send Low, High, expect Low
	*andGate.inputSignals[0] <- Low
	*andGate.inputSignals[1] <- High
	<-*andGate.outputSignals[0]
	outputLogicLevel = <-*andGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}

	// send High, Low, expect Low
	*andGate.inputSignals[0] <- High
	*andGate.inputSignals[1] <- Low
	<-*andGate.outputSignals[0]
	outputLogicLevel = <-*andGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}

	// send High, High, expect High
	*andGate.inputSignals[0] <- High
	*andGate.inputSignals[1] <- High
	<-*andGate.outputSignals[0]
	outputLogicLevel = <-*andGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}
}

func TestNandGate(t *testing.T) {
	nandGate := NewNandGate()
	// check base component attributes
	if nandGate.name != "NewNandGate" {
		t.Errorf("Expected name to be 'NewNandGate', got %s", nandGate.name)
	}
	if nandGate.label != "Component" {
		t.Errorf("Expected label to be 'Component', got %s", nandGate.label)
	}
	if len(nandGate.inputs) != 2 {
		t.Errorf("Expected 2 inputs, got %d", len(nandGate.inputs))
	}
	if len(nandGate.inputPins) != 2 {
		t.Errorf("Expected 2 input pins, got %d", len(nandGate.inputPins))
	}
	if len(nandGate.inputSignals) != 2 {
		t.Errorf("Expected 2 input signals, got %d", len(nandGate.inputSignals))
	}
	if len(nandGate.outputs) != 1 {
		t.Errorf("Expected 1 output, got %d", len(nandGate.outputs))
	}
	if len(nandGate.outputPins) != 1 {
		t.Errorf("Expected 1 output pin, got %d", len(nandGate.outputPins))
	}
	if len(nandGate.outputSignals) != 1 {
		t.Errorf("Expected 1 output signal, got %d", len(nandGate.outputSignals))
	}

	// check the transfer function

	// send Low, Low, expect High
	*nandGate.inputSignals[0] <- Low
	*nandGate.inputSignals[1] <- Low
	<-*nandGate.outputSignals[0]
	outputLogicLevel := <-*nandGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}

	// send Low, High, expect High
	*nandGate.inputSignals[0] <- Low
	*nandGate.inputSignals[1] <- High
	<-*nandGate.outputSignals[0]
	outputLogicLevel = <-*nandGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}

	// send High, Low, expect High
	*nandGate.inputSignals[0] <- High
	*nandGate.inputSignals[1] <- Low
	<-*nandGate.outputSignals[0]
	outputLogicLevel = <-*nandGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}

	// send High, High, expect Low
	*nandGate.inputSignals[0] <- High
	*nandGate.inputSignals[1] <- High
	<-*nandGate.outputSignals[0]
	outputLogicLevel = <-*nandGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}
}

func TestOrGate(t *testing.T) {
	orGate := NewOrGate()
	// check base component attributes
	if orGate.name != "NewOrGate" {
		t.Errorf("Expected name to be 'NewOrGate', got %s", orGate.name)
	}
	if orGate.label != "Component" {
		t.Errorf("Expected label to be 'Component', got %s", orGate.label)
	}
	if len(orGate.inputs) != 2 {
		t.Errorf("Expected 2 inputs, got %d", len(orGate.inputs))
	}
	if len(orGate.inputPins) != 2 {
		t.Errorf("Expected 2 input pins, got %d", len(orGate.inputPins))
	}
	if len(orGate.inputSignals) != 2 {
		t.Errorf("Expected 2 input signals, got %d", len(orGate.inputSignals))
	}
	if len(orGate.outputs) != 1 {
		t.Errorf("Expected 1 output, got %d", len(orGate.outputs))
	}
	if len(orGate.outputPins) != 1 {
		t.Errorf("Expected 1 output pin, got %d", len(orGate.outputPins))
	}
	if len(orGate.outputSignals) != 1 {
		t.Errorf("Expected 1 output signal, got %d", len(orGate.outputSignals))
	}

	// check the transfer function

	// send Low, Low, expect Low
	*orGate.inputSignals[0] <- Low
	*orGate.inputSignals[1] <- Low
	<-*orGate.outputSignals[0]
	outputLogicLevel := <-*orGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}

	// send Low, High, expect High
	*orGate.inputSignals[0] <- Low
	*orGate.inputSignals[1] <- High
	<-*orGate.outputSignals[0]
	outputLogicLevel = <-*orGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}

	// send High, Low, expect High
	*orGate.inputSignals[0] <- High
	*orGate.inputSignals[1] <- Low
	<-*orGate.outputSignals[0]
	outputLogicLevel = <-*orGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}

	// send High, High, expect High
	*orGate.inputSignals[0] <- High
	*orGate.inputSignals[1] <- High
	<-*orGate.outputSignals[0]
	outputLogicLevel = <-*orGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}
}

func TestNorGate(t *testing.T) {
	norGate := NewNorGate()
	// check base component attributes
	if norGate.name != "NewNorGate" {
		t.Errorf("Expected name to be 'NewNorGate', got %s", norGate.name)
	}
	if norGate.label != "Component" {
		t.Errorf("Expected label to be 'Component', got %s", norGate.label)
	}
	if len(norGate.inputs) != 2 {
		t.Errorf("Expected 2 inputs, got %d", len(norGate.inputs))
	}
	if len(norGate.inputPins) != 2 {
		t.Errorf("Expected 2 input pins, got %d", len(norGate.inputPins))
	}
	if len(norGate.inputSignals) != 2 {
		t.Errorf("Expected 2 input signals, got %d", len(norGate.inputSignals))
	}
	if len(norGate.outputs) != 1 {
		t.Errorf("Expected 1 output, got %d", len(norGate.outputs))
	}
	if len(norGate.outputPins) != 1 {
		t.Errorf("Expected 1 output pin, got %d", len(norGate.outputPins))
	}
	if len(norGate.outputSignals) != 1 {
		t.Errorf("Expected 1 output signal, got %d", len(norGate.outputSignals))
	}

	// check the transfer function

	// send Low, Low, expect High
	*norGate.inputSignals[0] <- Low
	*norGate.inputSignals[1] <- Low
	<-*norGate.outputSignals[0]
	outputLogicLevel := <-*norGate.outputSignals[0]
	if outputLogicLevel != High {
		t.Errorf("Expected logic level to be High, got %v", outputLogicLevel.String())
	}

	// send Low, High, expect Low
	*norGate.inputSignals[0] <- Low
	*norGate.inputSignals[1] <- High
	<-*norGate.outputSignals[0]
	outputLogicLevel = <-*norGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}

	// send High, Low, expect Low
	*norGate.inputSignals[0] <- High
	*norGate.inputSignals[1] <- Low
	<-*norGate.outputSignals[0]
	outputLogicLevel = <-*norGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}

	// send High, High, expect Low
	*norGate.inputSignals[0] <- High
	*norGate.inputSignals[1] <- High
	<-*norGate.outputSignals[0]
	outputLogicLevel = <-*norGate.outputSignals[0]
	if outputLogicLevel != Low {
		t.Errorf("Expected logic level to be Low, got %v", outputLogicLevel.String())
	}
}
