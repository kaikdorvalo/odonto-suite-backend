export class Regex {
    onlyAlphabetic(string: string): string {
        return string.replace(/[^a-zA-Z]/g, '');
    }
}