import { Controller } from '@nestjs/common';
import { Body, Post, Req } from '@nestjs/common/decorators';
import { ApiExtraModels, ApiOperation, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Request } from 'express';


export class User {
    @ApiProperty({
        name: "name",
        example: "default foo name example"
    })
    name: string
    @ApiProperty({
        name: "type",
        enum: ["FOO", "BAR"],
        example: "BAR"
    })
    type: "FOO" | "BAR"
    @ApiProperty({
        name: "age",
        example: 10
    })
    age: number
}


@ApiExtraModels(User)
@Controller()
export class AppController {



    @ApiOperation({
        description: "with body annotation",
        requestBody: {
            description: "User body Example",
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: getSchemaPath(User) },
                    examples: {
                        "Foo User": {
                            value: {
                                name: "foo name diffrent",
                                age: 20,
                                type: "FOO"
                            } as User,
                            description: "This is Foo user Example",
                        },
                        "Bar User": {
                            value: {
                                name: "bar name diffrent",
                                age: 30,
                                type: "BAR"
                            } as User,
                            description: "This is Bar user Example",
                        }
                    }
                }
            }
        }
    })
    @Post("/with")
    withBodyAnnotation(@Body() payload: User) {
        return payload
    }

    @ApiOperation({
        description: "with body annotation",
        requestBody: {
            description: "User body Example",
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: getSchemaPath(User) },
                    examples: {
                        "Foo User": {
                            value: {
                                name: "foo name diffrent",
                                age: 20,
                                type: "FOO"
                            } as User,
                            description: "This is Foo user Example",
                        },
                        "Bar User": {
                            value: {
                                name: "bar name diffrent",
                                age: 30,
                                type: "BAR"
                            } as User,
                            description: "This is Bar user Example",
                        }
                    }
                }
            }
        }
    })
    @Post("/without")
    withOuthBodyAnnotation(@Req() request: Request) {
        return request.body
    }
}
