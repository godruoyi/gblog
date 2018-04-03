@if( $errors->any())
    <div class="alert alert-dismissable alert-danger" style="border-radius: 0px;line-height: 26px;background-color: #f2dede;">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <ul>
            @foreach($errors->all() as $error)
            <li style="color: #a94442;">{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
