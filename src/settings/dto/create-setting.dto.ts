import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateSettingDto {
  @ApiProperty({
    description: "Setting key",
    example: "siteTitle",
  })
  @IsString({ message: "Key string olmalıdır" })
  @IsNotEmpty({ message: "Key boş ola bilməz" })
  key: string;

  @ApiProperty({
    description: "Setting value (string/object/number)",
    example: { az: "HotelShop", en: "HotelShop" },
  })
  @IsDefined({ message: "Value tələb olunur" })
  value: any;
}
