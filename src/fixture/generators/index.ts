import { ArrayGenerator } from './array';
import { BigIntGenerator, BigIntMultipleOfGenerator } from './bigint';
import { BooleanGenerator } from './boolean';
import { BrandedGenerator } from './branded';
import { DateGenerator } from './date';
import {
	PreprocessGenerator,
	RefinementGenerator,
	TransformGenerator,
} from './effects';
import { EnumGenerator } from './enum';
import { FunctionGenerator } from './function';
import { LazyGenerator } from './lazy';
import { LiteralGenerator } from './literal';
import { MapGenerator } from './map';
import { NanGenerator } from './nan';
import { NeverGenerator } from './never';
import { NullGenerator } from './null';
import { NumberGenerator } from './number';
import { ObjectGenerator, RecordGenerator } from './object';
import { PromiseGenerator } from './promise';
import { SetGenerator } from './set';
import {
	Cuid2Generator,
	CuidGenerator,
	DateTimeGenerator,
	EmailGenerator,
	IpGenerator,
	RegexGenerator,
	StringGenerator,
	UlidGenerator,
	UrlGenerator,
	UuidGenerator,
} from './string';
import { SymbolGenerator } from './symbol';
import { TupleGenerator } from './tuple';
import { UndefinedGenerator, VoidGenerator } from './undefined';
import { UnionGenerator } from './union';

export const DEFAULT_FIXTURE_GENERATORS = [
	IpGenerator,
	UlidGenerator,
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
	CuidGenerator,
	Cuid2Generator,
	EmailGenerator,
	UrlGenerator,
	DateTimeGenerator,
	RegexGenerator,
	StringGenerator,
	TupleGenerator,
	UndefinedGenerator,
	UnionGenerator,
	TransformGenerator,
	PreprocessGenerator,
	RefinementGenerator,
	PromiseGenerator,
	SymbolGenerator,
	LazyGenerator,
	BrandedGenerator,
	VoidGenerator,
	NeverGenerator,
];

export {
	ArrayGenerator,
	BigIntGenerator,
	BigIntMultipleOfGenerator,
	BooleanGenerator,
	BrandedGenerator,
	Cuid2Generator,
	CuidGenerator,
	DateGenerator,
	DateTimeGenerator,
	EmailGenerator,
	EnumGenerator,
	FunctionGenerator,
	IpGenerator,
	LazyGenerator,
	LiteralGenerator,
	MapGenerator,
	NanGenerator,
	NeverGenerator,
	NullGenerator,
	NumberGenerator,
	ObjectGenerator,
	PreprocessGenerator,
	PromiseGenerator,
	RecordGenerator,
	RefinementGenerator,
	RegexGenerator,
	SetGenerator,
	StringGenerator,
	SymbolGenerator,
	TransformGenerator,
	TupleGenerator,
	UndefinedGenerator,
	UnionGenerator,
	UrlGenerator,
	UuidGenerator,
	VoidGenerator
};

