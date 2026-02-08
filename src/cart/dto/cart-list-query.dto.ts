import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class CartListQueryDto {
  @ApiPropertyOptional({
    description: "Səhifə nömrəsi",
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Səhifə nömrəsi rəqəm olmalıdır" })
  @Min(1, { message: "Səhifə nömrəsi 1-dən kiçik ola bilməz" })
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Hər səhifədə səbət sayı",
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "Limit rəqəm olmalıdır" })
  @Min(1, { message: "Limit 1-dən kiçik ola bilməz" })
  limit?: number = 10;
}
