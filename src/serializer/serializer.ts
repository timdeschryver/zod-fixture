import { Transformer } from '@/transformer/transformer';
import { serializerGenerators } from './generators';

export class Serializer extends Transformer {
	generators = serializerGenerators;
}
