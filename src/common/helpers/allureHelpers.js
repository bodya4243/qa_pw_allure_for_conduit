import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
    const testFolder = 'tests/';
    const normalizedFileName = fileName.replaceAll('\\', '/');

    const attributesCamelCase = normalizedFileName
        .substring(normalizedFileName.indexOf(testFolder) + testFolder.length)
        .split('/');

    const attributes = attributesCamelCase.map(attribute => capitalize(camelCaseToPhrase(attribute)));

    if (attributes.at(-1).includes('.spec.js')) {
        attributes[attributes.length - 1] = attributes.at(-1).replace('.spec.js', '');
    }

    logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

    return attributes;
}
