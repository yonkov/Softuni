import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Post } from "../../shared/models/post";
import { Injectable } from "@angular/core";
import { BlogService } from "../../core/services/blog.service";

@Injectable({
    providedIn: 'root'
})
export class SinglePostResolver implements Resolve<Post> {

    constructor(private blogService: BlogService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'];
        return this.blogService.getPost(id);
    }

}