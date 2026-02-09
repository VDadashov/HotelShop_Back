import { ApiProperty } from "@nestjs/swagger";
import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class MultilingualTextDto {
  @ApiProperty({
    description: "Azərbaycan dilində mətn",
    example: "HotelShop",
  })
  @IsString()
  @IsNotEmpty()
  az: string;

  @ApiProperty({
    description: "İngilis dilində mətn",
    example: "HotelShop",
  })
  @IsOptional()
  @IsString()
  en?: string;

  @ApiProperty({
    description: "Rus dilində mətn",
    example: "HotelShop",
  })
  @IsOptional()
  @IsString()
  ru?: string;
}

export class CreateSettingDto {
  @ApiProperty({
    description: "Setting key",
    example: "siteTitle",
  })
  @IsString({ message: "Key string olmalıdır" })
  @IsNotEmpty({ message: "Key boş ola bilməz" })
  key: string;

  @ApiProperty({
    description: "Setting value (çoxdilli)",
    type: MultilingualTextDto,
    example: { az: "HotelShop", en: "HotelShop", ru: "HotelShop" },
  })
  @IsDefined({ message: "Value tələb olunur" })
  @IsObject()
  @ValidateNested()
  @Type(() => MultilingualTextDto)
  value: MultilingualTextDto;
}
