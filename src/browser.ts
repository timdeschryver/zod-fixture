import MersenneTwister from '@/core/utils/MersenneTwister';
import { z } from 'zod';
import { Core, Generator, createFixture } from '.';
import { ZOD_INSTANCE_IDENTIFIER, ZOD_TYPE_IDENTIFIER } from './core/generator';

Object.assign(window, {
	Generator,
	Core,
	MersenneTwister,
	ZOD_TYPE_IDENTIFIER,
	ZOD_INSTANCE_IDENTIFIER,
	createFixture,
	z,
});
