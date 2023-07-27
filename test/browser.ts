import { createFixture, Fixture, Generator, Transformer } from '@/public';
import MersenneTwister from '@/transformer/utils/MersenneTwister';
import { z } from 'zod';

Object.assign(window, {
	createFixture,
	Generator,
	Transformer,
	MersenneTwister,
	Fixture,
	z,
});
