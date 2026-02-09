import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export class UpdateSettingDto {
  @ApiProperty({
    description: "Yeni value",
    example: { az: "HotelShop 2", en: "HotelShop 2" },
  })
  @IsDefined({ message: "Value tələb olunur" })
  value: any;
}
