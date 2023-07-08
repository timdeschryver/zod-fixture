import { Fixture, Generator, Transformer } from '@/public';
import { ZOD_INSTANCE_IDENTIFIER } from '@/transformer/generator';
import MersenneTwister from '@/transformer/utils/MersenneTwister';
import { z } from 'zod';

Object.assign(window, {
	Generator,
	Transformer,
	ZOD_INSTANCE_IDENTIFIER,
	MersenneTwister,
	Fixture,
	z,
});
