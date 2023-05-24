import { z } from 'zod';
import { generate } from '.';
import { ZOD_INSTANCE_IDENTIFIER, ZOD_TYPE_IDENTIFIER } from './core/generator';

const win = window as any

win.ZOD_TYPE_IDENTIFIER = ZOD_TYPE_IDENTIFIER;
win.ZOD_INSTANCE_IDENTIFIER = ZOD_INSTANCE_IDENTIFIER;
win.z = z;
win.generate = generate;
