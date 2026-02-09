import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Setting } from "../_common/entities/setting.entity";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<Setting> {
    const existing = await this.settingRepository.findOne({
      where: { key: createSettingDto.key },
    });

    if (existing) {
      throw new BadRequestException("Bu key mövcuddur");
    }

    const setting = this.settingRepository.create(createSettingDto);
    return await this.settingRepository.save(setting);
  }

  async findAll(): Promise<Setting[]> {
    return await this.settingRepository.find({
      order: { createdAt: "DESC" },
    });
  }

  async findOneByKey(key: string): Promise<Setting> {
    const setting = await this.settingRepository.findOne({ where: { key } });
    if (!setting) {
      throw new NotFoundException("Setting tapılmadı");
    }
    return setting;
  }

  async updateByKey(
    key: string,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    const setting = await this.findOneByKey(key);
    setting.value = updateSettingDto.value;
    return await this.settingRepository.save(setting);
  }

  async removeByKey(key: string): Promise<{ message: string }> {
    const setting = await this.findOneByKey(key);
    await this.settingRepository.remove(setting);
    return { message: "Setting uğurla silindi" };
  }
}
