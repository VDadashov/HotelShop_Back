import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Setting } from "../_common/entities/setting.entity";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { SettingsService } from "./settings.service";

@ApiTags("Settings")
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @ApiOperation({ summary: "Yeni setting yarat" })
  @ApiResponse({ status: 201, type: Setting })
  async create(@Body() createSettingDto: CreateSettingDto): Promise<Setting> {
    return this.settingsService.create(createSettingDto);
  }

  @Get()
  @ApiOperation({ summary: "Bütün setting-ləri gətir" })
  @ApiResponse({ status: 200, type: [Setting] })
  async findAll(): Promise<Setting[]> {
    return this.settingsService.findAll();
  }

  @Get(":key")
  @ApiOperation({ summary: "Key ilə setting gətir" })
  @ApiParam({ name: "key", type: "string", description: "Setting key" })
  @ApiResponse({ status: 200, type: Setting })
  async findOne(@Param("key") key: string): Promise<Setting> {
    return this.settingsService.findOneByKey(key);
  }

  @Patch(":key")
  @ApiOperation({ summary: "Key-ə görə setting yenilə" })
  @ApiParam({ name: "key", type: "string", description: "Setting key" })
  @ApiResponse({ status: 200, type: Setting })
  async update(
    @Param("key") key: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<Setting> {
    return this.settingsService.updateByKey(key, updateSettingDto);
  }

  @Delete(":key")
  @ApiOperation({ summary: "Key-ə görə setting sil" })
  @ApiParam({ name: "key", type: "string", description: "Setting key" })
  @ApiResponse({ status: 200, description: "Uğurla silindi" })
  async remove(@Param("key") key: string): Promise<{ message: string }> {
    return this.settingsService.removeByKey(key);
  }
}
