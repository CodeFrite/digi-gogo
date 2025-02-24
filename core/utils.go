package core

import (
	"reflect"
	"runtime"
	"strings"
)

func getFuncName(f interface{}) string {
	funcName := runtime.FuncForPC(reflect.ValueOf(f).Pointer()).Name()
	return strings.Split(funcName, ".")[1]
}
