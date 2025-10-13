import { FormContextType, Registry, RJSFSchema, StrictRJSFSchema } from './types';

/** Generates an HTML name attribute for an option element (checkbox, radio button) by appending the index
 * to the parent's htmlName using the nameGenerator function when available
 *
 * @param id - The id of the option element
 * @param htmlName - The parent's HTML name attribute
 * @param registry - The registry containing globalFormOptions with the nameGenerator
 * @param index - The index of this option
 * @returns - The HTML name attribute for this specific option
 */
export default function toOptionName<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  id: string,
  htmlName: string | undefined,
  registry: Registry<T, S, F>,
  index: number,
): string {
  const { globalFormOptions } = registry;
  const { nameGenerator } = globalFormOptions;

  // If both htmlName and nameGenerator exist, generate the indexed name
  if (htmlName && nameGenerator) {
    // Call the nameGenerator with just the index as the path to get the suffix
    const indexSuffix = nameGenerator([index], '');
    return `${htmlName}${indexSuffix}`;
  }

  return htmlName || id;
}
