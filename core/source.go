package core

import (
	"time"
)

// Source: component that generates signals at a given interval
// It is fully defined by its transfer function:
// - the transfer function uses time.Ticker to generate signals at a given frequency on its input pin
// - the generator function defines how many signals are generated, hence how many output pins the source has
// - each generated signal is sent to the corresponding output pin
// - the input pin is hidden: it is not really defined as a pin (to not be rendered): we instead instantiante a Ticker that we manually root to the input channel also defined manually
type Clock struct {
	*Component
	ticker *time.Ticker
	period time.Duration
}

func NewClock(duration time.Duration) *Clock {
	transferFn := func(inputs []*LogicLevel) []LogicLevel {
		input := inputs[0]
		if *input == Low {
			return []LogicLevel{High}
		} else {
			return []LogicLevel{Low}
		}
	}
	// instantiate a component without any input pin
	component := NewComponent([]string{}, []string{"S"}, transferFn)

	// instantiate a ticker and stop it for now
	ticker := time.NewTicker(duration)
	ticker.Stop()

	// manually add an input channel for the clock
	inputSignal := make(Signal)
	component.AddHiddenInput(inputSignal)

	// instantiate a new source
	clock := Clock{
		Component: component,
		ticker:    ticker,
		period:    time.Second,
	}

	// launch a go routine that listens to the ticker and redirects the signal to the input signal
	go func() {
		for range ticker.C {
			if *clock.inputs[0] == Undefined || *clock.inputs[0] == High {
				*clock.inputSignals[0] <- Low
			} else {
				*clock.inputSignals[0] <- High
			}
		}
	}()

	return &clock
}

func (s *Clock) Start() {
	s.ticker.Reset(s.period)
}

func (s *Clock) Stop() {
	s.ticker.Stop()
}

func (s *Clock) Reset(duration time.Duration) {
	s.period = duration
	s.ticker.Reset(s.period)
}

type PushButton struct {
	*Component
}

// PushButton: source that alternates between Low and High when clicked
func NewPushButton() *PushButton {
	transferFn := func(inputs []*LogicLevel) []LogicLevel {
		input := inputs[0]
		if *input == Low {
			*input = High
			return []LogicLevel{High}
		} else {
			*input = Low
			return []LogicLevel{Low}
		}
	}
	// instantiate a component without any input pin
	component := NewComponent([]string{}, []string{"S"}, transferFn)

	// manually add an input channel for the push button
	inputSignal := make(Signal)
	component.AddHiddenInput(inputSignal)

	return &PushButton{
		Component: component,
	}
}

func (s *PushButton) OnClick() {
	go func() {
		*s.inputSignals[0] <- *s.inputs[0]
	}()
}
