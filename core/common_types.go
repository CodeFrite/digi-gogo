package core

// Processing and messaging

// Logic levels represent the 3 possible states of a signal: low or high
// TODO: see how to handle HiZ (high impedance) state later
type LogicLevel int

const (
	Low LogicLevel = iota
	High
	Undefined
)

// A signal is a channel on which logic levels are sent and received
type Signal chan LogicLevel

type SignalListener struct {
	signal   *Signal
	doneChan chan bool
}

type Connection struct {
	pin            *Pin
	signalListener *SignalListener
}

// A transfer function is a function that represents the processing taking place in a component
// It takes input and output signals as parameters:
// - inputChannels: the input signals from which to listen for changes on the input pins
// - outputChannels: the output signals to which to send the output signals on the output pins
type TransferFn func(inputs []LogicLevel) []LogicLevel

type GeneratorFn func() []Signal

// UX: Positioning / Look & Feel
type Orientation int

const (
	Top Orientation = iota
	Bottom
	Left
	Right
)

type Point struct {
	x, y int
}

// alias for Point
type Position = Point

type Segment struct {
	p1, p2 Point
}
