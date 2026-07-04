import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
    const testFolder = 'tests/';

    const attributesCamelCase = fileName.substring(fileName.indexOf(testFolder) + testFolder.length).split('/');

    let attributes = attributesCamelCase.map(attribute => capitalize(camelCaseToPhrase(attribute)));

    if (attributes.at(-1).includes('.spec.js')) {
        const lastAttrIndex = attributes.at(-1).indexOf('.spec.js');
        attributes = attributes.slice(0, lastAttrIndex);
    }

    logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

    return attributes;
}
