package core

/*
func TestOscillator(t *testing.T) {
	oscillator := NewOscillator(50, 10)
	actual := make([]LogicLevel, 0)
	go func() {
		for {
			logicLevel := <-oscillator.signal
			actual = append(actual, logicLevel)
		}
	}()

	time.Sleep(time.Second)
	oscillator.Stop()

	expected := []LogicLevel{0, 1, 0, 1, 0, 1, 0, 1, 0, 1}

	for i := range actual {
		if actual[i] != expected[i] {
			t.Errorf("Expected to receive logic levels %v, got %v", expected, actual)
		}
	}
}
*/
