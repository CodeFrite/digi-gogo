package core

import (
	"fmt"
	"testing"
	"time"
)

func TestClock(t *testing.T) {
	clock := NewClock(time.Second)
	clock.Start()

	for i := 0; i < 5; i++ {
		fmt.Printf("%v> Clock state: %s\n", i, (<-*clock.outputSignals[0]).String())
	}
}

func TestPushButton(t *testing.T) {
	pushButton := NewPushButton()

	for i := 0; i < 5; i++ {
		pushButton.OnClick()
		fmt.Printf("%v>Push button clicked: new state is %s\n", i, (<-*pushButton.outputSignals[0]).String())
		time.Sleep(1 * time.Second)
	}
}
