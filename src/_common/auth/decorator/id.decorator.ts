import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const AuthId = createParamDecorator((_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  const id = req.id;

  if (id === undefined || id === null) {
    throw new UnauthorizedException('로그인이 필요합니다.');
  }

  return id;
});
