import { Fixture, Generator, Transformer } from '@/public';
import MersenneTwister from '@/transformer/utils/MersenneTwister';
import { z } from 'zod';

Object.assign(window, {
	Generator,
	Transformer,
	MersenneTwister,
	Fixture,
	z,
});
