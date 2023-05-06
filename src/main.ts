import { z } from 'zod';
import { generate } from '.';

const win = window as any

win.z = z;
win.generate = generate;
