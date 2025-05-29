import { useAuth } from '../../store/auth';
import './Service.css'


const Service = () => {

    const { service } = useAuth();

    return (
        <>
            <div className='service-sec'>
                <div className='row'>
                    <div className='col-md-3 m-5'>
                        {service.map((currEle, index) => {

                            const { name, description, price, image } = currEle;

                            return (
                                <>
                                    <div class="card" key={index}>
                                        <img src={ image } class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{ name }</h5>
                                            <p class="card-text">{ description }</p>
                                            <p class="card-text">{ price }</p>
                                            <a href="#" class="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Service;