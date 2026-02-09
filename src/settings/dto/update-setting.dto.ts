import { ApiProperty } from "@nestjs/swagger";
import {
  IsDefined,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class MultilingualTextDto {
  @ApiProperty({
    description: "Azərbaycan dilində mətn",
    example: "HotelShop 2",
  })
  @IsString()
  @IsNotEmpty()
  az: string;

  @ApiProperty({
    description: "İngilis dilində mətn",
    example: "HotelShop 2",
  })
  @IsString()
  @IsNotEmpty()
  en: string;

  @ApiProperty({
    description: "Rus dilində mətn",
    example: "HotelShop 2",
  })
  @IsString()
  @IsNotEmpty()
  ru: string;
}

export class UpdateSettingDto {
  @ApiProperty({
    description: "Yeni value (çoxdilli)",
    type: MultilingualTextDto,
    example: { az: "HotelShop 2", en: "HotelShop 2", ru: "HotelShop 2" },
  })
  @IsDefined({ message: "Value tələb olunur" })
  @IsObject()
  @ValidateNested()
  @Type(() => MultilingualTextDto)
  value: MultilingualTextDto;
}
