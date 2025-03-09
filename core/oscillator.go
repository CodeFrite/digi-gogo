package core

type Oscillator struct {
	logicLevel LogicLevel
	signal     Signal
	doneChan   chan bool
	output     Pin
	dutyCycle  int // percentage of the time the signal is high
	frequency  int
}

/*
func NewOscillator(dutyCycle int, frequency int) Oscillator {
	oscillator := Oscillator{}
	oscillator.logicLevel = Low
	oscillator.dutyCycle = dutyCycle
	oscillator.frequency = frequency
	oscillator.signal = make(chan LogicLevel)
	oscillator.output = NewPin("O")
	oscillator.output.ConnectInput(oscillator.signal)
	oscillator.Start()
	return oscillator
}

func (o *Oscillator) Start() {
	o.doneChan = make(chan bool)
	go func() {
		o.signal <- o.logicLevel // send initial level
		ticker := time.NewTicker((1000 / time.Duration(o.frequency)) * time.Millisecond)
		for {
			select {
			case <-ticker.C:
				if o.logicLevel == Low {
					o.logicLevel = High
				} else {
					o.logicLevel = Low
				}
				o.signal <- o.logicLevel
			case <-o.doneChan:
				return
			}
		}
	}()
}

func (o *Oscillator) Stop() {
	o.doneChan <- false
}
*/
