import { Transformer } from '../transformer/transformer';
import { seraializeGenerators } from './generators';

export class Serializer extends Transformer {
	generators = seraializeGenerators;
}
