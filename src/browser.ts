import MersenneTwister from '@/transformer/utils/MersenneTwister';
import { z } from 'zod';
import { Fixture, Generator, Transformer } from '.';
import {
	ZOD_INSTANCE_IDENTIFIER,
	ZOD_TYPE_IDENTIFIER,
} from './transformer/generator';

Object.assign(window, {
	Generator,
	Transformer,
	MersenneTwister,
	ZOD_TYPE_IDENTIFIER,
	ZOD_INSTANCE_IDENTIFIER,
	Fixture,
	z,
});
