import { Vector } from "./Vector";
import { update } from "../../algorithm";

export class VectorBoolean extends Vector<boolean> {

    flip() {
        update(this.begin(), this.end(), b => !b);
        return this;
    }

}