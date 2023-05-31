import type { ZodTypeAny, z } from 'zod';
import {
	arrayWithLengthCustomization,
	bigIntRandomizeCustomization,
	booleanSequenceCustomization,
	dateRandomizeCustomization,
	dateRandomizeZodSchemaCustomization,
	intersectionCustomization,
	literalValueCustomization,
	mapCustomization,
	nanCustomization,
	noopCustomization,
	nullCustomization,
	numberRandomizeCustomization,
	numberRandomizeZodSchemaCustomization,
	objectCustomization,
	randomValueOfPossiblesCustomication,
	recordCustomization,
	setCustomization,
	stringCustomization,
	undefinedCustomization,
	unionRandomizeCustomization,
} from './customizations';
import type { Customization } from './customizations';
import { effectCustomization } from './customizations/effect-customization';
import { generate } from './generate';
import { tupleCustomization } from './customizations/tuple-customization';

const defaultCustomizations = [
	stringCustomization(),
	bigIntRandomizeCustomization(),
	numberRandomizeCustomization(),
	numberRandomizeZodSchemaCustomization(),
	booleanSequenceCustomization(),
	dateRandomizeCustomization(),
	dateRandomizeZodSchemaCustomization(),
	nullCustomization(),
	undefinedCustomization(),
	noopCustomization(),
	nanCustomization(),
	randomValueOfPossiblesCustomication() as Customization<
		Record<string, unknown>
	>,
	literalValueCustomization() as Customization<Record<string, unknown>>,
	arrayWithLengthCustomization() as Customization<Record<string, unknown>>,
	objectCustomization() as Customization<Record<string, unknown>>,
	recordCustomization() as Customization<Record<string, unknown>>,
	mapCustomization() as Customization<Record<string, unknown>>,
	setCustomization() as Customization<Record<string, unknown>>,
	tupleCustomization() as Customization<Record<string, unknown>>,
	unionRandomizeCustomization() as Customization<Record<string, unknown>>,
	effectCustomization() as Customization<Record<string, unknown>>,
	intersectionCustomization() as Customization<Record<string, unknown>>,
];

export function createFixture<ZSchema extends ZodTypeAny>(
	schema: ZSchema,
	{
		ignoreChecks = false,
		customizations = [],
		defaultLength = 3,
	}: {
		ignoreChecks?: boolean;
		defaultLength?: number;
		customizations?: Customization[];
	} = {},
): z.infer<typeof schema> {
	return generate(schema, {
		path: [],
		ignoreChecks,
		defaultLength,
		customizations: [...customizations, ...defaultCustomizations],
	});
}
