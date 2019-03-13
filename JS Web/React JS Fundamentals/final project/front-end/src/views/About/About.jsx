import React from 'react'
import Sidebar from '../../components/Sidebar';

const About =(props) =>{
  
    return(
        <section className="site-section pt-5">
        <div className="container">
          <div className="row blog-entries">
            <div className="col-md-12 col-lg-8 main-content">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="mb-4">Hi There! I'm Atanas Yonkov</h2>
                  <p className="mb-5"><img src="images/img_6.jpg" alt="Image placeholder" className="img-fluid" /></p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum minima eveniet recusandae suscipit
                    eum laboriosam fugit amet deleniti iste et. Ad dolores, necessitatibus non saepe tenetur impedit
                    commodi quibusdam natus repellat, exercitationem accusantium perferendis officiis. Laboriosam impedit
                    quia minus pariatur!</p>
                  <p>Dignissimos iste consectetur, nemo magnam nulla suscipit eius quibusdam, quo aperiam quia quae est
                    explicabo nostrum ab aliquid vitae obcaecati tenetur beatae animi fugiat officia id ipsam sint?
                    Obcaecati ea nisi fugit assumenda error totam molestiae saepe fugiat officiis quam?</p>
                  <p>Culpa porro quod doloribus dolore sint. Distinctio facilis ullam voluptas nemo voluptatum saepe
                    repudiandae adipisci officiis, explicabo eaque itaque sed necessitatibus, fuga, ea eius et aliquam
                    dignissimos repellendus impedit pariatur voluptates. Dicta perferendis assumenda, nihil placeat,
                    illum quibusdam. Vel, incidunt?</p>
                  <p>Dolorum blanditiis illum quo quaerat, possimus praesentium perferendis! Quod autem optio nobis,
                    placeat officiis dolorem praesentium odit. Vel, cum, a. Adipisci eligendi eaque laudantium dicta
                    tenetur quod, pariatur sunt sed natus officia fuga accusamus reprehenderit ratione, provident
                    possimus ut voluptatum.</p>
                </div>
              </div>
              
            </div>
            {/* END main-content */}
            <Sidebar {...props} />
          </div>
        </div>
      </section>
    );
};
export default About;