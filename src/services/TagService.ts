import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Tag } from "../entity/Tag";
import { TagReq } from '../interfaces/blogRequests';

class TagService {
    private tagRepository: Repository<Tag>

    constructor() {
        this.tagRepository = AppDataSource.getRepository(Tag);
    }

    async getOrCreateTag(data: TagReq): Promise<Tag> {
        const tag = await this.tagRepository.findOneBy({ value: data.value });

        if (tag) {
            return tag;
        }

        const newTag = new Tag();

        newTag.value = data.value;
        newTag.visualName = data.visualName ?? data.value;

        return this.tagRepository.save(newTag);
    }

    async getAllTags(): Promise<Tag[]> {
        return this.tagRepository.find();
    }
}

export default new TagService();