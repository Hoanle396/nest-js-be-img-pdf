import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        id: any;
        fullName: any;
        email: any;
        photoUrl: any;
        isVerify: any;
    }>;
}
export {};
