import { Fixture, Generator, Transformer } from '@/public';
import {
	ZOD_INSTANCE_IDENTIFIER,
	ZOD_TYPE_IDENTIFIER,
} from '@/transformer/generator';
import MersenneTwister from '@/transformer/utils/MersenneTwister';
import { z } from 'zod';

Object.assign(window, {
	Generator,
	Transformer,
	MersenneTwister,
	ZOD_TYPE_IDENTIFIER,
	ZOD_INSTANCE_IDENTIFIER,
	Fixture,
	z,
});
