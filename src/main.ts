import MersenneTwister from '@/core/utils/MersenneTwister';
import { z } from 'zod';
import { createFixture } from '.';
import { ZOD_INSTANCE_IDENTIFIER, ZOD_TYPE_IDENTIFIER } from './core/generator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win = window as any;

win.ZOD_TYPE_IDENTIFIER = ZOD_TYPE_IDENTIFIER;
win.ZOD_INSTANCE_IDENTIFIER = ZOD_INSTANCE_IDENTIFIER;
win.z = z;
win.createFixture = createFixture;
win.MersenneTwister = MersenneTwister;
