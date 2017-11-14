
import { IAction } from "./../common/interfaces";

export const ActionFactory = <T>(typeId: string) => {
    return (value: T): IAction<T> => {
        return {
            payload: value,
            type: typeId
        };
    };
}
