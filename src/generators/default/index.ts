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
import { SetGenerator } from './set';
import { StringGenerator, UrlGenerator } from './string';
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
	StringGenerator,
	UrlGenerator,
	TupleGenerator,
	UndefinedGenerator,
	UnionGenerator,
	TransformGenerator,
	PreprocessGenerator,
	RefinementGenerator,
];
