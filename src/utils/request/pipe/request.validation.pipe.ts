import {
    ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthLoginValidation } from 'src/app/auth/validation/auth.login.validation';
import { AuthSignUpValidation } from 'src/app/auth/validation/auth.sign-up.validation';
import { DebuggerService } from 'src/debugger/service/debugger.service';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../request.constant';

@Injectable()
export class RequestValidationPipe implements PipeTransform {
    constructor(private readonly debuggerService: DebuggerService) {}

    async transform(
        value: Record<string, any>,
        { metatype }: ArgumentMetadata
    ): Promise<Record<string, any>> {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const classTransformer = new metatype(value);
        const request = plainToInstance(metatype, {
            ...classTransformer,
            ...value,
        });
        this.debuggerService.debug(
            'Request Data',
            'RequestValidationPipe',
            'transform',
            request
        );

        const rawErrors: Record<string, any>[] = await validate(request);
        if (rawErrors.length > 0) {
            this.debuggerService.error(
                'Request Errors',
                'RequestValidationPipe',
                'transform',
                rawErrors
            );

            throw new UnprocessableEntityException({
                statusCode:
                    ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
                message: 'http.clientError.unprocessableEntity',
                errors: rawErrors,
            });
        }
        return request;
    }

    private toValidate(metatype: Record<string, any>): boolean {
        const types: Record<string, any>[] = [
            AuthLoginValidation,
            AuthSignUpValidation,
        ];
        return types.includes(metatype);
    }
}
