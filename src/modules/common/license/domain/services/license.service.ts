import { Inject, Injectable } from "@nestjs/common";
import { LicenseRepository } from "../repositories/license.repository";
import { Repositories } from "../../../../../common/constants/respositories.constants";

@Injectable()
export class LicenseService {
    constructor(
        @Inject(Repositories.LICENSE_REPOSITORY)
        private readonly licenseRepository: LicenseRepository
    ) { }


    generateLicenseKey() {
        const characters = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
        let blocks = 4;
        let charactersBlock = 6;
        let blocksArray: String[] = [];
        let key = '';

        for (let i = 0; i < blocks; i++) {
            blocksArray.push(this.generateBlock(characters, charactersBlock));
        }

        key = blocksArray.join('-');

        return key;
    }

    private generateBlock(characters: string, charactersBlock: number): string {
        let generatedBlock: string;

        do {
            generatedBlock = '';
            const length = characters.length;
            for (let i = 0; i < charactersBlock; i++) {
                const random = Math.floor(Math.random() * length);
                generatedBlock = generatedBlock + String(characters[random]);
            }

        } while (this.equalCharacters(generatedBlock));

        return generatedBlock;
    }

    private equalCharacters(block: string): boolean {
        let equal = true;
        let first = block[0];
        for (let i = 1; i < block.length; i++) {
            if (block[i] !== first) {
                equal = false;
                break;
            }
        }
        return equal;
    }

    async verifyThatTheKeyExists(key: string): Promise<boolean> {
        const license = await this.licenseRepository.findByKey(key);
        if (!license) {
            return false;
        }

        return true;
    }


}
