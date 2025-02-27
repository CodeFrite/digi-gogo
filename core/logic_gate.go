package core

func NewNotGate() *Component {
	transferFn := func(inputs []*LogicLevel) []LogicLevel {
		if *inputs[0] == Low {
			return []LogicLevel{High}
		} else {
			return []LogicLevel{Low}
		}
	}
	return NewComponent([]string{"A"}, []string{"Y"}, transferFn)
}

func NewAndGate() *Component {
	transferFn := func(inputs []*LogicLevel) []LogicLevel {
		if *inputs[0] == High && *inputs[1] == High {
			return []LogicLevel{High}
		} else {
			return []LogicLevel{Low}
		}
	}
	return NewComponent([]string{"A", "B"}, []string{"Y"}, transferFn)
}

func NewNandGate() *Component {
	transferFn := func(inputs []*LogicLevel) []LogicLevel {
		if *inputs[0] == High && *inputs[1] == High {
			return []LogicLevel{Low}
		} else {
			return []LogicLevel{High}
		}
	}
	return NewComponent([]string{"A", "B"}, []string{"Y"}, transferFn)
}

func NewOrGate() *Component {
	transferFn := func(inputs []*LogicLevel) []LogicLevel {
		if *inputs[0] == High || *inputs[1] == High {
			return []LogicLevel{High}
		} else {
			return []LogicLevel{Low}
		}
	}
	return NewComponent([]string{"A", "B"}, []string{"Y"}, transferFn)
}

func NewNorGate() *Component {
	transferFn := func(inputs []*LogicLevel) []LogicLevel {
		if *inputs[0] == High || *inputs[1] == High {
			return []LogicLevel{Low}
		} else {
			return []LogicLevel{High}
		}
	}
	return NewComponent([]string{"A", "B"}, []string{"Y"}, transferFn)
}
