import { ArrayGenerator } from './array';
import { BigIntGenerator, BigIntMultipleOfGenerator } from './bigint';
import { BooleanGenerator } from './boolean';
import { DateGenerator } from './date';
import {
	PreprocessGenerator,
	RefinementGenerator,
	TransformGenerator,
} from './effects';
import { EnumGenerator } from './enum';
import { FunctionGenerator } from './function';
import { LiteralGenerator } from './literal';
import { MapGenerator } from './map';
import { NanGenerator } from './nan';
import { NullGenerator } from './null';
import { NumberGenerator } from './number';
import { ObjectGenerator, RecordGenerator } from './object';
import { PromiseGenerator } from './promise';
import { SetGenerator } from './set';
import {
	EmailGenerator,
	StringGenerator,
	UrlGenerator,
	UuidGenerator,
} from './string';
import { SymbolGenerator } from './symbol';
import { TupleGenerator } from './tuple';
import { UndefinedGenerator } from './undefined';
import { UnionGenerator } from './union';

export default [
	ArrayGenerator,
	BigIntGenerator,
	BigIntMultipleOfGenerator,
	BooleanGenerator,
	DateGenerator,
	EnumGenerator,
	FunctionGenerator,
	LiteralGenerator,
	MapGenerator,
	NanGenerator,
	NullGenerator,
	NumberGenerator,
	ObjectGenerator,
	RecordGenerator,
	SetGenerator,
	UuidGenerator,
	EmailGenerator,
	UrlGenerator,
	StringGenerator,
	TupleGenerator,
	UndefinedGenerator,
	UnionGenerator,
	TransformGenerator,
	PreprocessGenerator,
	RefinementGenerator,
	PromiseGenerator,
	SymbolGenerator,
];
