import { Controller, Get, Post, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Customer } from '../_core/entities/customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@ApiTags('고객')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ 
    summary: '고객 정보 업로드', 
    description: '이름, 이메일, 전화번호를 포함한 고객 정보를 업로드합니다.' 
  })
  @ApiResponse({
    status: 201,
    description: '고객 정보 업로드 성공',
    type: Customer,
  })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const { name, email, phone } = createCustomerDto;
    return await this.customersService.create(name, email, phone);
  }

  @Get()
  @ApiOperation({ 
    summary: '고객 목록 조회', 
    description: '모든 고객 정보를 조회합니다.' 
  })
  @ApiResponse({
    status: 200,
    description: '고객 목록 조회 성공',
    type: [Customer],
  })
  async findAll() {
    return await this.customersService.findAll();
  }
}
