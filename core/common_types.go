package core

// Processing and messaging

// Logic levels represent the 3 possible states of a signal: low or high
type LogicLevel int

const (
	Low LogicLevel = iota
	High
	Undefined
)

func (l LogicLevel) String() string {
	switch l {
	case Low:
		return "Low"
	case High:
		return "High"
	case Undefined:
		return "Undefined"
	default:
		return "Unknown"
	}
}

// A signal is a channel on which logic levels are sent and received
type Signal chan LogicLevel

type SignalListener struct {
	signal   *Signal
	doneChan chan bool
}

// A transfer function is a function that represents the processing taking place in a component
// It takes input and output signals as parameters:
// - inputChannels: the input signals from which to listen for changes on the input pins
// - outputChannels: the output signals to which to send the output signals on the output pins
type TransferFn func(inputs []*LogicLevel) []LogicLevel

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
